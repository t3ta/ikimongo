//
//  MapViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit
import MapKit

protocol MapViewControllerInput: class {
    func setRecordsModel(_: RecordsModel)
}

final class MapViewController: UIViewController {
    var presenter: MapPresenterProtocol?

    @IBOutlet weak var mapView: MKMapView!

    var records: [RecordViewModel] = []

    public func inject(presenter: MapPresenterProtocol) {
        self.presenter = presenter
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.loadMyRecords()
    }

    @IBAction func arButtonTapped(_ sender: UIButton) {
        presenter?.arButtonTapped()
    }
}

extension MapViewController: MapViewControllerInput {
    func setRecordsModel(_ recordsModel: RecordsModel) {
        records = recordsModel.records

        records.forEach { [weak self] (record) in
            guard let self = self else { return }
            let annotation = MKPointAnnotation()
            annotation.coordinate = record.location.coordinate
            self.mapView.addAnnotation(annotation)
        }
    }
}

struct MapViewControllerBuilder {
    func build() -> UIViewController {
        let useCase = MapUseCase(loginRepository: LoginRepository(dataStore: LoginDataStore()),
                                 recordRepository: RecordRepository(dataStore: RecordDataStore()),
                                 catalogRepository: CatalogRepository(dataStore: CatalogDataStore()),
                                 mediumRepository: MediumRepository(dataStore: MediumDataStore()))
        let viewController = UIStoryboard(name: "MapViewController", bundle: nil).instantiateInitialViewController() as! MapViewController
        let router = MapRouter(viewController: viewController)
        let presenter = MapPresenter(useCase: useCase, router: router, viewInput: viewController)
        viewController.inject(presenter: presenter)
        return viewController
    }
}
