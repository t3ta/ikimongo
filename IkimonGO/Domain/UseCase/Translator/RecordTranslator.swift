//
//  RecordTranslator.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

struct RecordTranslator: Translator {
    typealias Input = [RecordEntity]
    typealias Output = RecordsModel

    func translate(_ entities: [RecordEntity]) throws -> RecordsModel {
        var recordsModel = RecordsModel()
        entities.forEach { (entity) in
            let recordModel = RecordModel(with: entity)
            recordsModel.records.append(recordModel)
        }
        return recordsModel
    }
}
