//
//  LoginPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol LoginPresenterProtocol {
    func tappedLoginButton(email: String?, password: String?)
}

struct LoginViewData {
    let email: String
    let password: String
}

final class LoginPresenter: LoginPresenterProtocol {
    let useCase: LoginUseCaseProtocol
    weak var viewInput: LoginViewControllerInput?
    
    fileprivate let disposeBag = DisposeBag()
    
    init(useCase: LoginUseCaseProtocol, viewInput: LoginViewControllerInput) {
        self.useCase = useCase
        self.viewInput = viewInput
    }
    
    func tappedLoginButton(email: String?, password: String?) {
        guard let email = email,
              let password = password else {
            viewInput?.showAlert(with: "メールアドレスとパスワードを入力してください")
            return
        }
        
        useCase.login(email: email, password: password)
            .subscribe(onNext: { (loginStatus) in
                // screen transition
                print("screen transition!")
            }, onError: { [weak self] (error) in
                guard let self = self else { return }
                self.viewInput?.showAlert(with: error.localizedDescription)
            }, onCompleted: nil, onDisposed: nil)
            .disposed(by: disposeBag)
    }
}
