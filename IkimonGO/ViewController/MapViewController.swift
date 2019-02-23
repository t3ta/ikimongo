//
//  MapViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol MapViewControllerInput: class {
    
}

final class MapViewController: UIViewController {
    var presenter: MapPresenterProtocol?
    
    public func inject(presenter: MapPresenterProtocol) {
        self.presenter = presenter
    }
    
    override func viewDidLoad() {
        presenter?.showMyRecords()
    }
}

extension MapViewController: MapViewControllerInput {

}
