//
//  MediumRepository.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol MediumRepositoryProtocol {
    
}

final class MediumRepository: MediumRepositoryProtocol {
    private let dataStore: MediumDataStoreProtocol
    
    init(dataStore: MediumDataStoreProtocol) {
        self.dataStore = dataStore
    }
}
