//
//  RecordViewModel.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/24.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import CoreLocation

protocol RecordViewModel {
    var name: String { get }
    var location: CLLocation { get }
}
