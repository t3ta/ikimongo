//
//  LoginGateway.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

protocol APIClientProtocol {
    func fetch(email: String, password: String, completion: @escaping (Result<LoginStatus>) -> Void)
}

protocol LoginGatewayProtocol {
    func fetch(email: String, password: String, completion: @escaping(Result<LoginStatus>) -> Void)
}

final class LoginGateway: LoginGatewayProtocol {
    let apiClient: APIClientProtocol
    
    init(apiClient: APIClientProtocol) {
        self.apiClient = apiClient
    }
    
    func fetch(email: String, password: String, completion: @escaping (Result<LoginStatus>) -> Void) {
        apiClient.fetch(email: email, password: password, completion: completion)
    }
}
