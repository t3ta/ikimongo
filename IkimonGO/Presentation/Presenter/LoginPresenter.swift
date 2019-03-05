//
//  LoginPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol LoginPresenterProtocol {
    func loginButtonTapped(email: String?, password: String?)
}

final class LoginPresenter: LoginPresenterProtocol {
    private let useCase: LoginUseCaseProtocol
    private let router: LoginRouterProtocol
    private weak var viewInput: LoginViewControllerInput?

    fileprivate let disposeBag = DisposeBag()

    init(useCase: LoginUseCaseProtocol, router: LoginRouterProtocol, viewInput: LoginViewControllerInput) {
        self.useCase = useCase
        self.router = router
        self.viewInput = viewInput
    }

    func loginButtonTapped(email: String?, password: String?) {
        guard let email = email,
              let password = password else {
            viewInput?.showAlert(with: "メールアドレスとパスワードを入力してください")
            return
        }

        useCase.login(email: email, password: password)
            .subscribe(onNext: { [weak self] (_) in
                guard let self = self else { return }
                self.router.transitionToMapViewController()
            }, onError: { [weak self] (error) in
                guard let self = self else { return }
                self.viewInput?.showAlert(with: error.localizedDescription)
            }, onCompleted: nil, onDisposed: nil)
            .disposed(by: disposeBag)
    }
}
