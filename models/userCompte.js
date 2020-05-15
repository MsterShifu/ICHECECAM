
//CLASSE NECESSAIRE POUR LA CREATION D'UN USER
class Userz {
    constructor (id, first_name, last_name, email_ad, user_name, password, isadm)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_ad = email_ad;
        this.user_name = user_name;
        this.password = password;
        this.isadm = isadm;
        }
}

 module.exports = Userz; 