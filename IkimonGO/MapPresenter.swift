//
//  MapPresenter.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

protocol MapPresenterProtocol {
    
}

final class MapPresenter: MapPresenterProtocol {
    let useCase: MapUseCaseProtocol
    weak var viewInput: MapViewControllerInput?
    
    init(useCase: MapUseCaseProtocol, viewInput: MapViewControllerInput) {
        self.useCase = useCase
        self.viewInput = viewInput
    }
}
