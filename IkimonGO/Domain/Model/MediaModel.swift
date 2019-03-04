//
//  MediaModel.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct MediaModel {
    var media: [MediumModel] = []

    init(with entities: [MediumEntity]) {
        media = entities.map { (entity) -> MediumModel in
            MediumModel(fileName: entity.fileName, originalName: entity.originalName, encoding: entity.encoding, mimeType: entity.mimeType, path: entity.path, size: entity.size, description: entity.description ?? "", owner: entity.owner)
        }
    }
}

struct MediumModel {
    let fileName: String
    let originalName: String
    let encoding: String
    let mimeType: String
    let path: String
    let size: Int
    let description: String
    let owner: String
}
