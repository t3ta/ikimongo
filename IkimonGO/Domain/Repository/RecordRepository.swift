//
//  RecordRepository.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol RecordRepositoryProtocol {
    func getMyRecords(with accessToken: String) -> Observable<[RecordEntity]>
}

final class RecordRepository: RecordRepositoryProtocol {
    private let dataStore: RecordDataStoreProtocol

    init(dataStore: RecordDataStoreProtocol) {
        self.dataStore = dataStore
    }

    func getMyRecords(with accessToken: String) -> Observable<[RecordEntity]> {
        return dataStore.getMyRecords(with: accessToken)
    }
}
