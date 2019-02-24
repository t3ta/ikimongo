//
//  MapPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol MapPresenterProtocol {
    func showMyRecords()
}

final class MapPresenter: MapPresenterProtocol {
    let useCase: MapUseCaseProtocol
    weak var viewInput: MapViewControllerInput?
    
    fileprivate let disposeBag = DisposeBag()
    
    init(useCase: MapUseCaseProtocol, viewInput: MapViewControllerInput) {
        self.useCase = useCase
        self.viewInput = viewInput
    }
    
    func showMyRecords() {
        useCase.getMyRecords()
            .subscribe(onNext: { (records) in
                print(records)
            }, onError: { (error) in
                print(error)
            }, onCompleted: nil, onDisposed: nil)
        .disposed(by: disposeBag)
    }
}
