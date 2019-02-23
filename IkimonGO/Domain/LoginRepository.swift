//
//  LoginRepository.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol LoginRepositoryProtocol {
    func getAccessToken() -> Observable<String>
    func getLoginStatus(email: String, password: String) -> Observable<LoginStatus>
}

final class LoginRepository: LoginRepositoryProtocol {
    private let dataStore: LoginDataStoreProtocol
    
    init(dataStore: LoginDataStoreProtocol) {
        self.dataStore = dataStore
    }
    
    func getAccessToken() -> Observable<String> {
        return dataStore.getAccessToken()
    }
    
    func getLoginStatus(email: String, password: String) -> Observable<LoginStatus> {
        return dataStore.getLoginStatus(email: email, password: password)
    }
}
