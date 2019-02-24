//
//  LoginRouter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol LoginViewControllerProtocol: Transitioner {}

extension LoginViewController: LoginViewControllerProtocol {}

protocol LoginRouterProtocol: AnyObject {
    func transitionToMapViewController()
}

final class LoginRouter: LoginRouterProtocol {
    private(set) weak var viewController: LoginViewControllerProtocol!
    
    init(viewController: LoginViewControllerProtocol) {
        self.viewController = viewController
    }
    
    func transitionToMapViewController() {
        let builder = MapViewControllerBuilder()
        viewController.present(viewController: builder.build(), completion: nil)
    }
}
