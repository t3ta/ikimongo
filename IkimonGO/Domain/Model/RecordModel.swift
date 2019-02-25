//
//  RecordModel.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation
import CoreLocation

struct RecordsModel {
    var records: [RecordModel] = []
}

struct RecordModel: RecordViewModel {
    let id: String
    let name: String
    let japaneseName: String
    let scientificName: String
    let location: CLLocation
    let collectedAt: Date
    let media: MediaModel
    let additionalData: [String:String]
    let owner: String
    
    init(with entity: RecordEntity) {
        id = entity.id
        name = entity.name
        japaneseName = entity.japaneseName ?? ""
        scientificName = entity.scientificName ?? ""
        collectedAt = entity.collectedAt
        owner = entity.owner
        additionalData = entity.additionalData ?? [:]
        
        if let lat = CLLocationDegrees(exactly: entity.latitude),
            let lon = CLLocationDegrees(exactly: entity.longitude) {
            location = CLLocation(latitude: lat, longitude: lon)
        } else {
            fatalError()
        }
        
        if let mediumEntities = entity.media {
            media = MediaModel(with: mediumEntities)
        } else {
            fatalError()
        }
    }
}
