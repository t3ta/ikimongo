//
//  FormatEnttity.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct FormatEnttity: Decodable {
    let name: String
    let elements: [FormatElement]
    
    struct FormatElement: Decodable {
        let key: String
        let isRequired: Bool
    }
}
