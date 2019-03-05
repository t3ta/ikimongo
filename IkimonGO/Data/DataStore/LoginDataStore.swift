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
    func getToken(email: String, password: String) -> Observable<TokenEntity>
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

    func getToken(email: String, password: String) -> Observable<TokenEntity> {
        let provider = MoyaProvider<AuthAPI>()

        return Observable<TokenEntity>.create({ (observer) -> Disposable in
            _ = provider.rx
                        .request(.login(email: email, password: password))
                        .filterSuccessfulStatusCodes()
                        .map({ (response) -> TokenEntity? in
                            return try? JSONDecoder().decode(TokenEntity.self, from: response.data)
                        })
                        .subscribe(onSuccess: { (tokenEntity) in
                            if let tokenEntity = tokenEntity {
                                UserDefaults.standard.set(tokenEntity.accessToken, forKey: "accessToken")
                                observer.onNext(tokenEntity)
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
