//
//  LoginDataStore.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation
import RxSwift
import RxMoya
import Moya

protocol LoginDataStoreProtocol {
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus?>
}

final class LoginDataStore: LoginDataStoreProtocol {
    private let provider = MoyaProvider<AuthAPI>()
    
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus?> {
        return provider.rx
            .request(.login(email: email, password: password))
            .map({ (response) -> LoginStatus? in
                return try? JSONDecoder().decode(LoginStatus.self, from: response.data)
            })
            .asObservable()
    }
}
