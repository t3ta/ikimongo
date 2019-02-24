//
//  ARPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol ARPresenterProtocol {
    func loadMyRecords()
}

final class ARPresenter: ARPresenterProtocol {
    private let useCase: ARUseCaseProtocol
    weak var viewInput: ARViewControllerInput?
    
    fileprivate let disposeBag = DisposeBag()
    
    init(useCase: ARUseCaseProtocol, viewInput: ARViewControllerInput) {
        self.useCase = useCase
        self.viewInput = viewInput
    }
    
    func loadMyRecords() {
        useCase.getMyRecords()
            .subscribe(onNext: { [weak self] (records) in
                guard let self = self else { return }
                self.viewInput?.setRecordsModel(records)
            }, onError: { (error) in
                print(error)
            }, onCompleted: nil, onDisposed: nil)
            .disposed(by: disposeBag)
    }
}
