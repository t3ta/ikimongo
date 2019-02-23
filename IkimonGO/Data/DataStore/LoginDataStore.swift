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
}

protocol LoginDataStoreProtocol {
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus>
}

final class LoginDataStore: LoginDataStoreProtocol {
    private let provider = MoyaProvider<AuthAPI>()
    
    func getAccessToken(email: String, password: String) -> Observable<LoginStatus> {
        return Observable<LoginStatus>.create({ [weak self] (observer) -> Disposable in
            guard let self = self else { return Disposables.create() }
            
            let _ = self.provider.rx
                        .request(.login(email: email, password: password))
                        .filterSuccessfulStatusCodes()
                        .map({ (response) -> LoginStatus? in
                            return try? JSONDecoder().decode(LoginStatus.self, from: response.data)
                        })
                        .subscribe(onSuccess: { (loginStatus) in
                            if let loginStatus = loginStatus {
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
