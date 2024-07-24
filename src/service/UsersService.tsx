import { Users } from "../domain/ModelConnectionEmails";
import User from "../model/User";
import config from 'config';
import moment from "moment";
import bcrypt from 'bcrypt';

export default class UsersService {

    async addUserData (user: User) {
        let userRes: any;
        let newId = await this.#getId();
        const actDate = moment().format('YYYY-MM-DD');
        const pass = user.password;
        const saltRounds = config.get('security.saltRounds') as number
        const passHash = await this.getHashPass(pass, saltRounds);
        try {
            userRes = await Users.create({...user, id: newId, date: actDate, password: passHash})
           return userRes;
               
        } catch (error: any) {
            if (error.code != 11000) { 
                throw error;
            }
        }

        
    }

    async getAllDataByUser(tz: string) {
        const dataByUser = await Users.findAll({where: {teudatZeut: tz}});
        return dataByUser;
    }

    async getEmail(id: number) {
        const email = await Users.findByPk(id);
        return email;
       }

    async #getId() {
        let id: any;
        const minId = config.get("user.minId") as number;
        const maxId = config.get("user.maxId") as number;
        const delta = maxId - minId + 1;
       do {
            id = minId + Math.trunc(Math.random() * delta);
        } while(await this.getEmail(id));
        return id;
        }

        async getHashPass(pass: string, saltRounds: number) {
            return await bcrypt.hash(pass, saltRounds);

        }

}

