//
//  Record.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import Foundation

struct Record {
    let name: String
    let japaneseName: String?
    let scientificName: String?
    let latitude: Double
    let longitude: Double
    let accuracy: Double?
    let collectedAt: Date
    let Medium: [Medium]
    let additionalData: [AdditionalDataElement]?
    
    struct AdditionalDataElement {
        let key: String
        let value: String
    }
}
