//
//  LoginViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit
import SwinjectStoryboard

protocol LoginViewControllerInput: class {
    func showAlert(with message: String)
}

final class LoginViewController: UIViewController {
    var presenter: LoginPresenterProtocol?
    
    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    
    public func inject(presenter :LoginPresenterProtocol) {
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
        let alert = UIAlertController(title: "エラー", message: message, preferredStyle:  .alert)
        let action = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(action)
        present(alert, animated: true, completion: nil)
    }
}

struct LoginViewControllerBuilder {
    func build() -> UIViewController {
        let sb = SwinjectStoryboard.create(name: "LoginViewController", bundle: nil, container: SwinjectStoryboard.defaultContainer)
        return sb.instantiateViewController(withIdentifier: "LoginViewController")
    }
}

extension SwinjectStoryboard {
    class func setup() {
        defaultContainer.register(LoginDataStore.self) { _ in LoginDataStore() }
        defaultContainer.register(LoginRepository.self) { r in
            LoginRepository(dataStore: r.resolve(LoginDataStore.self)!)
        }
        defaultContainer.register(LoginUsecase.self) { r in
            LoginUsecase(repository: r.resolve(LoginRepository.self)!)
        }
        defaultContainer.register(LoginRouter.self) { (r, vc: LoginViewController) in
            LoginRouter(viewController: vc)
        }
        defaultContainer.register(LoginPresenter.self) { (r, vc: LoginViewController) in
            LoginPresenter(useCase: r.resolve(LoginUsecase.self)!, router: r.resolve(LoginRouter.self, argument: vc)!, viewInput: vc)
        }
        defaultContainer.storyboardInitCompleted(LoginViewController.self) { (r, c) in
            c.presenter = r.resolve(LoginPresenter.self, argument: c)
        }
    }
}
