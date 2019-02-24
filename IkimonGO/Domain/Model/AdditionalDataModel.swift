//
//  AdditionalDataModel.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct AdditionalDataModel {
    var data: [AdditionalDatumModel] = []
    
    init(with entities: [AdditionalDatumEntity]) {
        data = entities.map { (entity) -> AdditionalDatumModel in
            AdditionalDatumModel(key: entity.key, value: entity.value)
        }
    }
}

struct AdditionalDatumModel {
    let key: String
    let value: String
}
