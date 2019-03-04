//
//  MapPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol MapPresenterProtocol {
    func loadMyRecords()
    func arButtonTapped()
}

final class MapPresenter: MapPresenterProtocol {
    private let useCase: MapUseCaseProtocol
    private let router: MapRouterProtocol
    weak var viewInput: MapViewControllerInput?

    fileprivate let disposeBag = DisposeBag()

    init(useCase: MapUseCaseProtocol, router: MapRouterProtocol, viewInput: MapViewControllerInput) {
        self.useCase = useCase
        self.router = router
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

    func arButtonTapped() {
        router.transitionToARViewController()
    }
}
