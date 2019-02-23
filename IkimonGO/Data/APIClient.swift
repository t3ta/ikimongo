//
//  APIClient.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

class APIClientStub: APIClientProtocol {
    func fetch(email: String, password: String, completion: @escaping (Result<LoginStatus>) -> Void) {
        let loginStatus = LoginStatus(userName: "t3ta", accessToken: "hogehoge")
        completion(.success(loginStatus))
    }
}
