// FlexNetGX/gx-web/src/state/bounties.rs
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct bountiestate {
    pub items: Vec<bounty>,
    pub responses: HashMap<String, Vec<bountyResponse>>,
    pub active_bounty_id: Option<String>,
    pub filters: bountyFilters,
    pub statistics: bountiestatistics,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct bountyFilters {
    pub status: Option<bountiestatus>,
    pub date_range: Option<(DateTime<Utc>, DateTime<Utc>)>,
    pub tag: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct bountiestatistics {
    pub total_responses: usize,
    pub average_completion_time: f64,
    pub response_rate: f64,
    pub completion_rate: f64,
}

pub enum bountyAction {
    SetFilter(bountyFilters),
    UpdateStatistics(bountiestatistics),
    SetActivebounty(Option<String>),
    AddResponse(String, bountyResponse),
    ClearResponses(String),
}

impl bountiestate {
    pub fn apply_action(&mut self, action: bountyAction) {
        match action {
            bountyAction::SetFilter(filters) => {
                self.filters = filters;
            }
            bountyAction::UpdateStatistics(stats) => {
                self.statistics = stats;
            }
            bountyAction::SetActivebounty(id) => {
                self.active_bounty_id = id;
            }
            bountyAction::AddResponse(bounty_id, response) => {
                self.responses
                    .entry(bounty_id)
                    .or_insert_with(Vec::new)
                    .push(response);
                self.update_statistics();
            }
            bountyAction::ClearResponses(bounty_id) => {
                self.responses.remove(&bounty_id);
                self.update_statistics();
            }
        }
    }

    fn update_statistics(&mut self) {
        let total_responses: usize = self.responses.values().map(|r| r.len()).sum();
        let total_bounties = self.items.len();
        
        self.statistics = bountiestatistics {
            total_responses,
            average_completion_time: self.calculate_average_completion_time(),
            response_rate: self.calculate_response_rate(),
            completion_rate: self.calculate_completion_rate(),
        };
    }

    // Helper methods for statistics calculations...
}