//
//  ARRouter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol ARViewControllerProtocol: Transitioner {}

extension ARViewController: ARViewControllerProtocol {}

protocol ARRouterProtocol: AnyObject {
    func transitionToMapViewController()
}

final class ARRouter: ARRouterProtocol {
    private(set) weak var viewController: ARViewControllerProtocol!

    init(viewController: ARViewControllerProtocol) {
        self.viewController = viewController
    }

    func transitionToMapViewController() {
        let builder = MapViewControllerBuilder()
        viewController.present(viewController: builder.build(), completion: nil)
    }
}
