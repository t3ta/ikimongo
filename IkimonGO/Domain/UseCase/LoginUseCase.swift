//
//  LoginUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

protocol LoginUseCaseProtocol: AnyObject {
    func startFetch(email: String, password: String)
    func set(loginStatus: LoginStatus)
}

protocol LoginUsecaseOutput {
    func useCaseDidUpdateStatus(_ loginStatus: LoginStatus)
    func useCaseDidReceiveError(_ error: Error)
}

final class LoginUsecase: LoginUseCaseProtocol {
    let gateway: LoginGatewayProtocol
    
    init(gateway: LoginGatewayProtocol) {
        self.gateway = gateway
    }
    
    func startFetch(email: String, password: String) {
        gateway.fetch(email: email, password: password) { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .failure(let e):
                self.output.useCaseDidReceiveError(e)
            case .success(let loginStatus):
                self.output.useCaseDidUpdateStatus(loginStatus)
            }
        }
    }
    
    func set(loginStatus: LoginStatus) {
        
    }
}
