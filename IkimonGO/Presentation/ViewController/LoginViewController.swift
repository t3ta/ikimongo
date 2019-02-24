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
    
    public func inject(presenter :LoginPresenterProtocol) {
        self.presenter = presenter
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func loginButtonTapped(_ sender: Any) {
        presenter?.tappedLoginButton(email: emailField.text, password: passwordField.text)
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

