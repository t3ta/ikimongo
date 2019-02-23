//
//  LoginViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    var presenter: LoginPresenterProtocol?
    
    public func inject(presenter: LoginPresenterProtocol) {
        self.presenter = presenter
    }
    
    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func loginButtonTapped(_ sender: Any) {
        presenter?.startFetch(email: emailField.text, password: passwordField.text)
    }
}

extension LoginViewController: LoginPresenterOutput {
    func update(by viewData: LoginViewData) {
        
    }
    
    func showAlert(with message: String) {
        let alert: UIAlertController = UIAlertController(title: "エラー", message: message, preferredStyle:  .alert)
        present(alert, animated: true, completion: nil)
    }
}

