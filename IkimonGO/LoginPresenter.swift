//
//  LoginPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

protocol LoginPresenterProtocol {
    func startFetch(email: String?, password: String?)
}

protocol LoginPresenterOutput: class {
    func update(by viewData: LoginViewData)
    func showAlert(with message: String)
}

struct LoginViewData {
    let email: String
    let password: String
}

final class LoginPresenter: LoginPresenterProtocol, LoginUsecaseOutput {
    let useCase: LoginUseCaseProtocol
    private weak var output: LoginPresenterOutput?
    
    init(useCase: LoginUseCaseProtocol) {
        self.useCase = useCase
    }
    
    public func inject(output: LoginPresenterOutput) {
        self.output = output
    }
    
    func startFetch(email: String?, password: String?) {
        guard let email = email,
              let password = password else {
            output?.showAlert(with: "メールアドレスとパスワードを入力してください")
            return
        }
        
        useCase.startFetch(email: email, password: password)
    }
    
    func useCaseDidUpdateStatus(_ loginStatus: LoginStatus) {
        // screen transition
    }
    
    func useCaseDidReceiveError(_ error: Error) {
        // show error
    }
}
