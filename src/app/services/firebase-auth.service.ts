import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class FirebaseAuthService {
    public displayName: string;
    public email: string;
    public uid:string;

    constructor(public af: AngularFire) { }

    registerUser(email, password) {
        console.log(email)
        return this.af.auth.createUser({
            email: email,
            password: password
        });
    }

    saveUserInfoFromForm(uid, name, email) {
        return this.af.database.object('registeredUsers/' + uid).set({
            name: name,
            email: email,
            uid: uid,
        });
    }

    loginWithEmail(email, password) {
        return this.af.auth.login({
            email: email,
            password: password,
        },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password,
            });
    }

    /**
     * Logs out the current user
     */
    logout() {
        return this.af.auth.logout();
    }
}

