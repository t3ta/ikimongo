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

enum LoginError: Error {
    case parseError
    case noAccessToken
    case authError
}

protocol LoginDataStoreProtocol {
    func getAccessToken() -> Observable<String>
    func getLoginStatus(email: String, password: String) -> Observable<LoginStatus>
}

final class LoginDataStore: LoginDataStoreProtocol {
    func getAccessToken() -> Observable<String> {
        return Observable<String>.create({ (observer) -> Disposable in
            if let accessToken = UserDefaults.standard.object(forKey: "accessToken") as? String {
                observer.onNext(accessToken)
            } else {
                observer.onError(LoginError.noAccessToken)
            }
            
            return Disposables.create()
        })
    }
    
    func getLoginStatus(email: String, password: String) -> Observable<LoginStatus> {
        let provider = MoyaProvider<AuthAPI>()
        
        return Observable<LoginStatus>.create({ (observer) -> Disposable in
            let _ = provider.rx
                        .request(.login(email: email, password: password))
                        .filterSuccessfulStatusCodes()
                        .map({ (response) -> LoginStatus? in
                            return try? JSONDecoder().decode(LoginStatus.self, from: response.data)
                        })
                        .subscribe(onSuccess: { (loginStatus) in
                            if let loginStatus = loginStatus {
                                UserDefaults.standard.register(defaults: ["accessToken": loginStatus.accessToken])
                                observer.onNext(loginStatus)
                            } else {
                                observer.onError(LoginError.parseError)
                            }
                        }, onError: { (error) in
                            observer.onError(error)
                        })
            
            return Disposables.create()
        })
    }
}
