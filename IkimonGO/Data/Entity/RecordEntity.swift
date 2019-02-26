//
//  RecordEntity.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

struct RecordEntity: Decodable {
    let id: String
    let name: String
    let japaneseName: String?
    let scientificName: String?
    let latitude: Double
    let longitude: Double
    let accuracy: Double?
    let collectedAt: Date
    let media: [MediumEntity]?
    let additionalData: [String:String]?
    let owner: String
    
    enum Key: String, CodingKey {
        case id = "_id"
        case name
        case japaneseName = "japanese_name"
        case scientificName = "scientific_name"
        case latitude
        case longitude
        case accuracy
        case collectedAt = "collected_at"
        case media
        case additionalData = "additional_data"
        case owner
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.japaneseName = try? container.decode(String.self, forKey: .japaneseName)
        self.scientificName = try? container.decode(String.self, forKey: .scientificName)
        self.latitude = try container.decode(Double.self, forKey: .latitude)
        self.longitude = try container.decode(Double.self, forKey: .longitude)
        self.accuracy = try? container.decode(Double.self, forKey: .accuracy)
        self.media = try? container.decode([MediumEntity].self, forKey: .media)
        self.additionalData = try? container.decode([String:String].self, forKey: .additionalData)
        self.owner = try container.decode(String.self, forKey: .owner)
        
        let dateString = try container.decode(String.self, forKey: .collectedAt)
        let formatter = DateFormatter.iso8601Full
        if let date = formatter.date(from: dateString) {
            self.collectedAt = date
        } else {
            throw DecodingError.dataCorruptedError(forKey: .collectedAt, in: container, debugDescription: "Date string does not match format expected by formatter.")
        }
    }
}

extension DateFormatter {
    static let iso8601Full: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ"
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        return formatter
    }()
}
