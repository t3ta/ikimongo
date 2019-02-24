//
//  LoginRouter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol LoginViewControllerProtocol: AnyObject, Transitioner where Self: UIViewController {}

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
        let useCase = MapUseCase(loginRepository: LoginRepository(dataStore: LoginDataStore()),
                                 recordRepository: RecordRepository(dataStore: RecordDataStore()),
                                 catalogRepository: CatalogRepository(dataStore: CatalogDataStore()),
                                 mediumRepository: MediumRepository(dataStore: MediumDataStore()))
        let mapViewController = UIStoryboard(name: "MapViewController", bundle: nil).instantiateInitialViewController() as! MapViewController
        let presenter = MapPresenter(useCase: useCase, viewInput: mapViewController)
        mapViewController.inject(presenter: presenter)
        
        viewController.present(viewController: mapViewController, completion: nil)
    }
}
