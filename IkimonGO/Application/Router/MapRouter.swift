//
//  MapRouter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol MapViewControllerProtocol: Transitioner {}

extension MapViewController: MapViewControllerProtocol {}

protocol MapRouterProtocol: AnyObject {
    func transitionToARViewController()
}

final class MapRouter: MapRouterProtocol {
    private(set) weak var viewController: MapViewControllerProtocol!

    init(viewController: MapViewControllerProtocol) {
        self.viewController = viewController
    }

    func transitionToARViewController() {
        let builder = ARViewControllerBuilder()
        viewController.present(viewController: builder.build(), completion: nil)
    }
}
