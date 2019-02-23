//
//  MapUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol MapUseCaseProtocol {
    
}

final class MapUseCase: MapUseCaseProtocol {
    private let recordRepository: RecordRepositoryProtocol
    private let catalogRepository: CatalogRepositoryProtocol
    private let mediumRepository: MediumRepositoryProtocol
    
    init(recordRepository: RecordRepositoryProtocol,
         catalogRepository: CatalogRepositoryProtocol,
         mediumRepository: MediumRepositoryProtocol) {
        self.recordRepository = recordRepository
        self.catalogRepository = catalogRepository
        self.mediumRepository = mediumRepository
    }
}
