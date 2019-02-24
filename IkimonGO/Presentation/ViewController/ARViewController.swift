//
//  ARViewController.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import UIKit

protocol ARViewControllerInput: class {
    func setRecordsModel(_: RecordsModel)
}

final class ARViewController: UIViewController {
    var presenter: ARPresenterProtocol?
    
    var records: [RecordViewModel] = []
    
    public func inject(presenter: ARPresenterProtocol) {
        self.presenter = presenter
    }
    
    override func viewDidLoad() {
        presenter?.loadMyRecords()
    }
}

extension ARViewController: ARViewControllerInput {
    func setRecordsModel(_ recordsModel: RecordsModel) {
        records = recordsModel.records
        
        records.forEach { [weak self] (record) in
            guard let self = self else { return }
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
        let presenter = ARPresenter(useCase: useCase, viewInput: viewController)
        viewController.inject(presenter: presenter)
        return viewController
    }
}
