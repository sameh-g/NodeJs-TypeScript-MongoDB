import * as mongoose from "mongoose";

var AnalysisAndReportsSchema = new mongoose.Schema({
    ObjectUniqueId:{
        type: String
    },
    EntityType: {
        type: Number
    },
    ReportId: {
        type: Number
    },
    WorkBookId: {
        type: Number
    },
    Size: {
        type: Number
    },
    ReportName: {
        type: String
    },
    ReportType: {
        type: String
    },
    ReportStatus: {
        type: String
    },
    ReportUrl: {
        type: String
    },
    ReportDate: {
        type: Date
    },
    LastViewDate: {
        type: Date
    },
    DataFilterList: [
        {
            Name: {
                type: String
            },
            Values: [{
                type: String
            }]
        }
    ],
    DatasetUrl: {
        type: String
    },
    DataSetId: {
        type: Number
    },
    DataSetLastViewDate: {
        type: Date
    },
        
 } );
AnalysisAndReportsSchema.set('collection', 'AnalysisReports');

let reports = mongoose.model("AnalysisReports", AnalysisAndReportsSchema);
export default reports;