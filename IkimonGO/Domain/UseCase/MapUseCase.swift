//
//  MapUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol MapUseCaseProtocol {
    func getMyRecords() -> Observable<[Record]>
}

final class MapUseCase: MapUseCaseProtocol {
    private let loginRepository: LoginRepositoryProtocol
    private let recordRepository: RecordRepositoryProtocol
    private let catalogRepository: CatalogRepositoryProtocol
    private let mediumRepository: MediumRepositoryProtocol
    
    init(loginRepository: LoginRepositoryProtocol,
         recordRepository: RecordRepositoryProtocol,
         catalogRepository: CatalogRepositoryProtocol,
         mediumRepository: MediumRepositoryProtocol) {
        self.loginRepository = loginRepository
        self.recordRepository = recordRepository
        self.catalogRepository = catalogRepository
        self.mediumRepository = mediumRepository
    }
    
    func getMyRecords() -> Observable<[Record]> {
        return loginRepository.getAccessToken()
                    .flatMap({ [weak self] (accessToken) -> Observable<[Record]> in
                        guard let self = self else {
                            return Observable.error(LoginError.authError)
                        }
                        
                        return self.recordRepository.getMyRecords(with: accessToken)
                    })
    }
}
