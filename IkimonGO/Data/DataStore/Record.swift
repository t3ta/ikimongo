//
//  Record.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

struct Record: Decodable {
    let name: String
    let japaneseName: String?
    let scientificName: String?
    let latitude: Double
    let longitude: Double
    let accuracy: Double?
    let collectedAt: Date
    let media: [Medium]
    let additionalData: [AdditionalDataElement]?
    
    struct AdditionalDataElement: Decodable {
        let key: String
        let value: String
    }
    
    enum Key: String, CodingKey {
        case name
        case japaneseName = "japanese_name"
        case scientificName = "scientific_name"
        case latitude
        case longitude
        case accuracy
        case collectedAt = "collected_at"
        case media
        case additionalData = "additional_data"
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.japaneseName = try container.decode(String.self, forKey: .japaneseName)
        self.scientificName = try container.decode(String.self, forKey: .scientificName)
        self.latitude = try container.decode(Double.self, forKey: .latitude)
        self.longitude = try container.decode(Double.self, forKey: .longitude)
        self.accuracy = try container.decode(Double.self, forKey: .accuracy)
        self.collectedAt = try container.decode(Date.self, forKey: .collectedAt)
        self.media = try container.decode([Medium].self, forKey: .media)
        self.additionalData = try container.decode([AdditionalDataElement].self, forKey: .additionalData)
    }
}
