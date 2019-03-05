//
//  Transitioner.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol Transitioner: class where Self: UIViewController {
    func pushViewController(_ viewController: UIViewController, animated: Bool)
    func popViewController(animated: Bool)
    func popToRootViewController(animated: Bool)
    func popToViewController(_ viewController: UIViewController, animated: Bool)
    func present(viewController: UIViewController, completion: (() -> Void)?)
    func dismiss()
}

extension Transitioner {
    func pushViewController(_ viewController: UIViewController, animated: Bool) {
        guard let navigationController = navigationController else { return }
        navigationController.pushViewController(viewController, animated: animated)
    }

    func popViewController(animated: Bool) {
        guard let navigationController = navigationController else { return }
        navigationController.popViewController(animated: animated)
    }

    func popToRootViewController(animated: Bool) {
        guard let navigationController = navigationController else { return }
        navigationController.popToRootViewController(animated: animated)
    }

    func popToViewController(_ viewController: UIViewController, animated: Bool) {
        guard let navigationController = navigationController else { return }
        navigationController.popToViewController(viewController, animated: animated)
    }

    func present(viewController: UIViewController, completion: (() -> Void)?) {
        present(viewController, animated: false, completion: completion)
    }

    func dismiss() {
        dismiss(animated: false)
    }
}
