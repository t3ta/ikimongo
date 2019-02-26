//
//  MediumEntity.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct MediumEntity: Decodable {
    let fileName: String
    let originalName: String
    let encoding: String
    let mimeType: String
    let path: String
    let size: Int
    let description: String?
    let owner: String
    
    enum Key:String, CodingKey {
        case fileName = "filename"
        case originalName = "originalname"
        case encoding
        case mimeType = "mimetype"
        case path
        case size
        case description
        case owner
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        self.fileName = try container.decode(String.self, forKey: .fileName)
        self.originalName = try container.decode(String.self, forKey: .originalName)
        self.encoding = try container.decode(String.self, forKey: .encoding)
        self.mimeType = try container.decode(String.self, forKey: .mimeType)
        self.path = try container.decode(String.self, forKey: .path)
        self.size = try container.decode(Int.self, forKey: .size)
        self.description = try container.decode(String.self, forKey: .description)
        self.owner = try container.decode(String.self, forKey: .owner)
    }
}
