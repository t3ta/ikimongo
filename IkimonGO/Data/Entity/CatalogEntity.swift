//
//  CatalogEntity.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/23.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

struct CatalogEntity {
    let name: String
    let description: String?
    let format: FormatEnttity
    let status: String
    let records: [RecordEntity]
}
