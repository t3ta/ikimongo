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
    private let useCase: LoginUseCaseProtocol
    private let router: LoginRouterProtocol
    private weak var viewInput: LoginViewControllerInput?
        
    fileprivate let disposeBag = DisposeBag()
    
    init(useCase: LoginUseCaseProtocol, router: LoginRouterProtocol ,viewInput: LoginViewControllerInput) {
        self.useCase = useCase
        self.router = router
        self.viewInput = viewInput
    }
    
    func tappedLoginButton(email: String?, password: String?) {
        guard let email = email,
              let password = password else {
            viewInput?.showAlert(with: "メールアドレスとパスワードを入力してください")
            return
        }
        
        useCase.login(email: email, password: password)
            .subscribe(onNext: { [weak self] (loginStatus) in
                guard let self = self else { return }
                print(loginStatus)
                self.router.transitionToMapViewController()
            }, onError: { [weak self] (error) in
                guard let self = self else { return }
                self.viewInput?.showAlert(with: error.localizedDescription)
            }, onCompleted: nil, onDisposed: nil)
            .disposed(by: disposeBag)
    }
}
