//
//  APIClient.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation
import RxSwift

enum LoginError: Error {
    case invalid
}

struct LoginRequest {
    func getLoginStatus(email: String, password: String) -> Observable<LoginStatus> {
        return Observable.create({ (observer) -> Disposable in
            DispatchQueue.main.asyncAfter(deadline: .now() + 5, execute: {
                if email == "test@test.com" && password == "testtest" {
                    let loginStatus = LoginStatus(userName: "t3ta", accessToken: "hogehoge")
                    observer.onNext(loginStatus)
                    observer.onCompleted()
                } else {
                    observer.onError(LoginError.invalid)
                }
            })
            
            return Disposables.create()
        })
    }
}
