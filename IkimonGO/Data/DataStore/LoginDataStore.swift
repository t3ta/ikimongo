//
//  LoginDataStore.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation
import RxSwift

protocol LoginDataStoreProtocol {
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus>
}

class LoginDataStore: LoginDataStoreProtocol {
    let request = LoginRequest()
    
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus> {
        return request.getLoginStatus(email: email, password: password)
    }
}
