//
//  ARViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit
import ARKit
import ARCL
import CoreLocation

protocol ARViewControllerInput: class {
    func setRecordsModel(_: RecordsModel)
}

final class ARViewController: UIViewController, ARSCNViewDelegate {
    var presenter: ARPresenterProtocol?

    var sceneLocationView = SceneLocationView()
    @IBOutlet weak var mapButton: UIButton!

    var records: [RecordViewModel] = []

    public func inject(presenter: ARPresenterProtocol) {
        self.presenter = presenter
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.loadMyRecords()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        sceneLocationView.frame = view.bounds
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        sceneLocationView.run()
        view.addSubview(sceneLocationView)
        view.bringSubviewToFront(mapButton)
    }

    @IBAction func mapButtonTapped(_ sender: UIButton) {
        presenter?.mapButtonTapped()
    }
}

extension ARViewController: ARViewControllerInput {
    func setRecordsModel(_ recordsModel: RecordsModel) {
        records = recordsModel.records

        records.forEach { [weak self] (record) in
            guard let self = self else { return }
            let image = UIImage(named: "pin")!
            let annotationNode = LocationAnnotationNode(location: record.location, image: image)
            self.sceneLocationView.addLocationNodeWithConfirmedLocation(locationNode: annotationNode)
        }
    }
}

struct ARViewControllerBuilder {
    func build() -> UIViewController {
        let useCase = ARUseCase(loginRepository: LoginRepository(dataStore: LoginDataStore()),
                                 recordRepository: RecordRepository(dataStore: RecordDataStore()),
                                 catalogRepository: CatalogRepository(dataStore: CatalogDataStore()),
                                 mediumRepository: MediumRepository(dataStore: MediumDataStore()))
        let viewController = UIStoryboard(name: "ARViewController", bundle: nil).instantiateInitialViewController() as! ARViewController
        let router = ARRouter(viewController: viewController)
        let presenter = ARPresenter(useCase: useCase, router: router, viewInput: viewController)
        viewController.inject(presenter: presenter)
        return viewController
    }
}
