//
//  ARUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol ARUseCaseProtocol {
    func getMyRecords() -> Observable<RecordsModel>
}

final class ARUseCase: ARUseCaseProtocol {
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
    
    func getMyRecords() -> Observable<RecordsModel> {
        return loginRepository.getAccessToken()
            .flatMap({ [weak self] (accessToken) -> Observable<RecordsModel> in
                guard let self = self else {
                    return Observable.error(LoginError.authError)
                }
                
                return self.recordRepository.getMyRecords(with: accessToken)
                    .map(translator: RecordTranslator())
            })
    }
}
