//
//  LoginViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol LoginViewControllerInput: class {
    func showAlert(with message: String)
}

final class LoginViewController: UIViewController {
    var presenter: LoginPresenterProtocol?

    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!

    public func inject(presenter: LoginPresenterProtocol) {
        self.presenter = presenter
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func loginButtonTapped(_ sender: Any) {
        presenter?.loginButtonTapped(email: emailField.text, password: passwordField.text)
    }
}

extension LoginViewController: LoginViewControllerInput {
    func showAlert(with message: String) {
        let alert = UIAlertController(title: "エラー", message: message, preferredStyle: .alert)
        let action = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(action)
        present(alert, animated: true, completion: nil)
    }
}

struct LoginViewControllerBuilder {
    func build() -> UIViewController {
        let useCase = LoginUsecase(repository: LoginRepository(dataStore: LoginDataStore()))
        let viewController = UIStoryboard(name: "LoginViewController", bundle: nil).instantiateInitialViewController() as! LoginViewController
        let router = LoginRouter(viewController: viewController)
        let presenter = LoginPresenter(useCase: useCase, router: router, viewInput: viewController)
        viewController.inject(presenter: presenter)
        return viewController
    }
}
